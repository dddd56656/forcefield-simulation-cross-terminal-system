import 'package:flutter/material.dart';
import 'package:zhiyuan_mobile/src/data/apod/ApodService.dart';

import '../entities/ApodEntity.dart';
import 'package:dartz/dartz.dart'; // 使用Dartz库来简化错误处理

class FetchApodUseCase {
  final ApodService _apodService; // 依赖注入 ApodService

  // 构造函数
  FetchApodUseCase(this._apodService);

  // 执行用例：获取 APOD 数据
  Future<ApodEntity?> execute({String? date}) async {
    // 调用 ApodService 获取数据
    final apodData = await _apodService.fetchApodData(date: date);

    debugPrint('获取到数据${apodData}');
    // 将数据从服务层传递到 Domain 层（转换为 ApodEntity）
    if (apodData != null) {
      return ApodEntity(
        date: apodData.date,
        explanation: apodData.explanation,
        url: apodData.url,
        mediaType: apodData.mediaType,
        title: apodData.title,
        copyright: apodData.copyright,
      );
    } else {
      return null; // 如果获取失败，则返回 null
    }
  }
}

// lib/src/domain/usecases/get_asteroids.dart
