// repositories/asteroid_repository.dart
import 'package:dartz/dartz.dart';
import 'package:zhiyuan_mobile/src/domain/entities/asteroid.dart';

abstract class AsteroidRepository {
  // 获取指定日期范围内的小行星数据
  Future<Either<String, List<Asteroid>>> getAsteroidsFeed(
    String startDate,
    String endDate,
  );

  // 根据小行星 ID 查询具体的小行星数据
  Future<Either<String, Asteroid>> getAsteroidById(int id);
}
