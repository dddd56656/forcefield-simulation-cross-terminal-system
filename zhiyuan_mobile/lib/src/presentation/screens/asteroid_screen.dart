import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:dartz/dartz.dart' as dartz;
import 'package:zhiyuan_mobile/src/domain/entities/asteroid.dart';
import 'package:zhiyuan_mobile/src/domain/usecases/get_asteroids.dart';
import 'package:zhiyuan_mobile/src/presentation/widgets/asteroid_detail_screen.dart';

class AsteroidScreen extends StatefulWidget {
  const AsteroidScreen({Key? key}) : super(key: key);

  @override
  _AsteroidScreenState createState() => _AsteroidScreenState();
}

class _AsteroidScreenState extends State<AsteroidScreen> {
  // 默认日期范围：当前日期 - 8 天 到 当前日期 - 1 天
  DateTime _startDate = DateTime.now().subtract(const Duration(days: 8));
  DateTime _endDate = DateTime.now().subtract(const Duration(days: 1));

  // 格式化日期的函数
  String formatDate(DateTime date) {
    return "${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}";
  }

  // 日期范围选择器
  Future<void> _selectDateRange(BuildContext context) async {
    // 选择日期范围
    final DateTimeRange? picked = await showDateRangePicker(
      context: context,
      firstDate: DateTime.now().subtract(const Duration(days: 365)), // 可选择的最早日期
      lastDate: DateTime.now().subtract(
        const Duration(days: 1),
      ), // 可选择的最晚日期为当前日期 - 1 天
      initialDateRange: DateTimeRange(start: _startDate, end: _endDate),
    );

    if (picked != null) {
      setState(() {
        // 确保日期范围不超过7天
        if (picked.end.difference(picked.start).inDays <= 7) {
          _startDate = picked.start;
          _endDate = picked.end;
        } else {
          // 如果选择的日期间隔大于7天，重新设置结束日期为开始日期加7天
          _endDate = _startDate.add(const Duration(days: 7));
        }
      });
    }
  }

  @override
  void initState() {
    super.initState();
    // 在初始化时加载默认的APOD数据（当前日期 - 8 天到当前日期 - 1 天）
    Provider.of<GetAsteroids>(
      context,
      listen: false,
    ).execute(formatDate(_startDate), formatDate(_endDate));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Asteroids')),
      body: Column(
        children: [
          // 日期范围选择部分，改为显示一个单独的日历
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: ElevatedButton(
              onPressed: () => _selectDateRange(context),
              child: Text(
                "选择日期范围: ${formatDate(_startDate)} - ${formatDate(_endDate)}",
              ),
            ),
          ),

          // 小行星数据展示部分
          Expanded(
            child: Consumer<GetAsteroids>(
              builder: (context, getAsteroids, child) {
                return FutureBuilder<dartz.Either<String, List<Asteroid>>>(
                  future: getAsteroids.execute(
                    formatDate(_startDate),
                    formatDate(_endDate),
                  ),
                  builder: (context, snapshot) {
                    // 处理加载状态
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return const Center(child: CircularProgressIndicator());
                    }

                    // 处理错误状态
                    if (snapshot.hasError) {
                      return Center(child: Text('错误: ${snapshot.error}'));
                    }

                    // 处理没有数据的情况
                    if (!snapshot.hasData || snapshot.data!.isLeft()) {
                      return const Center(child: Text('没有数据。'));
                    }

                    // 从 `Right` 中提取数据（成功的情况）
                    final asteroids = snapshot.data!.getOrElse(() => []);

                    // 显示小行星列表
                    return ListView.builder(
                      itemCount: asteroids.length,
                      itemBuilder: (context, index) {
                        final asteroid = asteroids[index];
                        return ListTile(
                          title: Text(asteroid.name),
                          subtitle: Text('接近日期: ${asteroid.closeApproachDate}'),
                          onTap: () {
                            // 点击后弹出详细信息页面
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) =>
                                    AsteroidDetailScreen(asteroid: asteroid),
                              ),
                            );
                          },
                        );
                      },
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
