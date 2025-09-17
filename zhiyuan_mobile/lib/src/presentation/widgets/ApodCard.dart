import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';

// 创建一个用于展示 APOD 数据的卡片组件
class ApodCard extends StatelessWidget {
  // 必须的参数：标题、解释、图片 URL 和媒体类型（图像或视频）
  final String? title;
  final String? explanation;
  final String? imageUrl; // 图片的 URL
  final String? mediaType; // 媒体类型（图像或视频）

  // 构造函数
  const ApodCard({
    Key? key,
    this.title,
    this.explanation,
    this.imageUrl,
    this.mediaType,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.all(16.0), // 设置卡片的外边距
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // ListTile 是一个常见的 Flutter 组件，用于显示标题和副标题
          ListTile(
            title: Text(title ?? 'No Title'), // 显示 APOD 的标题
            subtitle: Text(explanation ?? 'No Explanation'), // 显示 APOD 的解释
          ),
          // 始终显示图片，不进行媒体类型判断
          CachedNetworkImage(
            imageUrl:
                imageUrl ?? 'https://default.com/default_image.jpg', // 默认图片 URL
            placeholder: (context, url) =>
                const CircularProgressIndicator(), // 加载过程中显示的进度条
            errorWidget: (context, url, error) =>
                const Icon(Icons.error), // 图片加载错误时显示的图标
          ),
        ],
      ),
    );
  }
}
