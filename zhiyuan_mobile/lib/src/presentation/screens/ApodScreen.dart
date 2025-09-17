import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart'; // 用于格式化日期
import 'package:zhiyuan_mobile/src/presentation/providers/ApodProvider.dart';
import 'package:zhiyuan_mobile/src/presentation/widgets/ApodCard.dart';

class ApodScreen extends StatefulWidget {
  const ApodScreen({Key? key}) : super(key: key);

  @override
  _ApodScreenState createState() => _ApodScreenState();
}

class _ApodScreenState extends State<ApodScreen> {
  // 用于存储选择的日期，设定为当前日期的前一天
  String selectedDate = DateFormat(
    'yyyy-MM-dd',
  ).format(DateTime.now().subtract(Duration(days: 1))); // 默认是前一天的日期

  @override
  void initState() {
    super.initState();
    // 在初始化时加载默认的APOD数据（前一天的数据）
    Provider.of<ApodProvider>(
      context,
      listen: false,
    ).fetchApodData(date: selectedDate);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('APOD - Astronomy Picture of the Day')),
      body: Consumer<ApodProvider>(
        // 使用 Provider 监听状态变化
        builder: (context, provider, child) {
          // 根据当前的状态显示不同的 UI
          if (provider.state == ApodState.loading) {
            return const Center(child: CircularProgressIndicator());
          }
          if (provider.state == ApodState.error) {
            return Center(child: Text(provider.errorMessage));
          }
          if (provider.state == ApodState.loaded) {
            // 如果数据加载完成，显示 APOD 列表
            final apodList = provider.apodList;
            return ListView(
              children: apodList.map((apod) {
                return ApodCard(
                  title: apod.title, // APOD 标题
                  explanation: apod.explanation, // APOD 解释
                  imageUrl: apod.url, // 图像 URL
                  mediaType: apod.mediaType, // 媒体类型（图片或视频）
                );
              }).toList(),
            );
          }
          // 默认情况下，如果没有数据，显示此提示
          return const Center(child: Text('No data available.'));
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          // 打开日期选择器，初始选中的日期为当前选择的日期
          final DateTime? picked = await showDatePicker(
            context: context,
            initialDate: DateTime.parse(selectedDate), // 设为当前选择的日期
            firstDate: DateTime(2000),
            lastDate: DateTime(2100),
          );

          if (picked != null && picked != DateTime.parse(selectedDate)) {
            setState(() {
              selectedDate = DateFormat('yyyy-MM-dd').format(picked); // 更新选择的日期
            });
            print('$selectedDate');
            // 加载选择日期的 APOD 数据
            Provider.of<ApodProvider>(
              context,
              listen: false,
            ).fetchApodData(date: selectedDate);
          }
        },
        child: const Icon(Icons.calendar_today), // 使用日历图标
      ),
    );
  }
}
