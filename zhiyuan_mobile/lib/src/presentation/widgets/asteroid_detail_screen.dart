// 小行星详细信息页面
import 'package:flutter/material.dart';
import 'package:zhiyuan_mobile/src/domain/entities/asteroid.dart';

class AsteroidDetailScreen extends StatelessWidget {
  final Asteroid asteroid;

  const AsteroidDetailScreen({Key? key, required this.asteroid})
    : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(asteroid.name)),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '小行星名称: ${asteroid.name}',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 8),
            Text('接近日期: ${asteroid.closeApproachDate}'),
            const SizedBox(height: 8),
            Text('最小直径: ${asteroid.estimatedDiameterMin} km'),
            const SizedBox(height: 8),
            Text('最大直径: ${asteroid.estimatedDiameterMax} km'),
            const SizedBox(height: 8),
            Text('是否潜在威胁: ${asteroid.isPotentiallyHazardous ? "是" : "否"}'),
            const SizedBox(height: 8),
            Text('相对速度: ${asteroid.relativeVelocity} km/h'),
            const SizedBox(height: 8),
            Text('错失距离: ${asteroid.missDistance} km'),
            const SizedBox(height: 8),
            Text('轨道天体: ${asteroid.orbitingBody}'),
          ],
        ),
      ),
    );
  }
}
