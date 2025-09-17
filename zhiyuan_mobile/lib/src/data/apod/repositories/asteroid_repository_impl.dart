import 'package:dartz/dartz.dart';
import 'package:zhiyuan_mobile/src/data/datasources/asteroid_remote_data_source.dart';
import 'package:zhiyuan_mobile/src/domain/entities/asteroid.dart';
import 'package:zhiyuan_mobile/src/domain/repositories/asteroid_repository.dart';

class AsteroidRepositoryImpl implements AsteroidRepository {
  final AsteroidRemoteDataSource remoteDataSource;

  // 构造函数
  AsteroidRepositoryImpl(this.remoteDataSource);

  @override
  Future<Either<String, List<Asteroid>>> getAsteroidsFeed(
    String startDate,
    String endDate,
  ) async {
    try {
      // 日志：开始请求数据
      print('Fetching asteroids data from $startDate to $endDate...');

      final data = await remoteDataSource.fetchAsteroidsFeed(
        startDate,
        endDate,
      );

      // 日志：成功获取数据
      print('Successfully fetched ${data.length} asteroids.');

      return Right(data); // 返回数据
    } catch (e) {
      // 日志：请求失败
      print('Error occurred while fetching asteroids data: $e');
      return Left(e.toString()); // 返回错误
    }
  }

  @override
  Future<Either<String, Asteroid>> getAsteroidById(int id) async {
    try {
      // 日志：开始请求单个小行星数据
      print('Fetching asteroid with ID: $id...');

      final data = await remoteDataSource.fetchAsteroidById(id);

      // 日志：成功获取数据
      print('Successfully fetched asteroid: ${data.name}');

      return Right(data); // 返回单个小行星数据
    } catch (e) {
      // 日志：请求失败
      print('Error occurred while fetching asteroid by ID: $e');
      return Left(e.toString()); // 返回错误
    }
  }
}
