import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'models/ApodModel.dart';

String apiKey = 'eTbSn8D7bpJt9HeuzPrJYVE1kPKDCsw1zJh6vOsP';

class ApodService {
  final Dio _dio = Dio(); // 初始化 Dio 实例

  // 获取 APOD 数据
  Future<ApodModel?> fetchApodData({String? date}) async {
    final String url = 'https://api.nasa.gov/planetary/apod';
    try {
      final response = await _dio.get(
        url,
        queryParameters: {'date': date, 'api_key': apiKey},
      );

      // 打印响应的详细信息
      debugPrint(
        "错误1:Request to $url succeeded with status code: ${response.statusCode}",
      );
      debugPrint("Response data: ${response.data}");

      if (response.statusCode == 200) {
        debugPrint('错误2获取到数据${response.data}');
        // 请求成功，解析 JSON 为 ApodModel 对象
        return ApodModel.fromJson(response.data);
      } else {
        // 请求失败，打印错误信息并返回 null
        debugPrint(
          "错误3Request failed with status code: ${response.statusCode}",
        );
        return null;
      }
    } catch (e) {
      // 捕获异常并打印错误信息
      debugPrint("错误4Request failed: $e");
      return null;
    }
  }
}
