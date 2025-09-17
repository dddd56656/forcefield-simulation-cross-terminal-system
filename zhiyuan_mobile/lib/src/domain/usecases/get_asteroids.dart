// use_cases/get_asteroids.dart
import 'package:dartz/dartz.dart';
import 'package:zhiyuan_mobile/src/domain/entities/asteroid.dart';
import 'package:zhiyuan_mobile/src/domain/repositories/asteroid_repository.dart';

class GetAsteroids {
  final AsteroidRepository repository;

  GetAsteroids(this.repository);

  // 获取小行星数据的主逻辑
  Future<Either<String, List<Asteroid>>> execute(
    String startDate,
    String endDate,
  ) {
    return repository.getAsteroidsFeed(startDate, endDate);
  }
}
