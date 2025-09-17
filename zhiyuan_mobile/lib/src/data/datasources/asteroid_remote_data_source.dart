// data/datasources/asteroid_remote_data_source.dart
import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:zhiyuan_mobile/src/domain/entities/asteroid.dart';

class AsteroidRemoteDataSource {
  final Dio dio;
  String apiKey = 'eTbSn8D7bpJt9HeuzPrJYVE1kPKDCsw1zJh6vOsP';
  AsteroidRemoteDataSource(this.dio);

  // 获取指定日期范围内的小行星数据
  Future<List<Asteroid>> fetchAsteroidsFeed(
    String startDate,
    String endDate,
  ) async {
    final response = await dio.get(
      'https://api.nasa.gov/neo/rest/v1/feed',
      queryParameters: {
        'start_date': startDate,
        'end_date': endDate,
        'api_key': apiKey,
      },
    );

    if (response.statusCode == 200) {
      // 确保 response.data['near_earth_objects'] 是一个 Map<String, List>
      Map<String, dynamic> data = response.data['near_earth_objects'];

      // 使用 expand 展开所有值并将它们转换为 List<Asteroid>
      List<Asteroid> asteroids = data.values
          .expand((e) => e) // 将所有列表合并为一个单一的列表
          .map((e) => Asteroid.fromJson(e)) // 将每个元素转换为 Asteroid 实体
          .toList();

      return asteroids;
    } else {
      throw Exception('Failed to load asteroids');
    }
  }

  // 根据小行星 ID 查询小行星数据
  Future<Asteroid> fetchAsteroidById(int id) async {
    final response = await dio.get(
      'https://api.nasa.gov/neo/rest/v1/neo/$id',
      queryParameters: {'api_key': 'DEMO_KEY'},
    );

    if (response.statusCode == 200) {
      return Asteroid.fromJson(response.data); // 返回单个小行星数据
    } else {
      throw Exception('Failed to load asteroid');
    }
  }
}
