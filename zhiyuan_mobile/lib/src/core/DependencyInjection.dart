// 初始化依赖注入
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:zhiyuan_mobile/src/data/apod/ApodService.dart';
import 'package:zhiyuan_mobile/src/data/apod/repositories/asteroid_repository_impl.dart';
import 'package:zhiyuan_mobile/src/data/datasources/asteroid_remote_data_source.dart';
import 'package:zhiyuan_mobile/src/domain/repositories/asteroid_repository.dart';
import 'package:zhiyuan_mobile/src/domain/usecases/FetchApodUseCase.dart';
import 'package:zhiyuan_mobile/src/domain/usecases/get_asteroids.dart';
import 'package:zhiyuan_mobile/src/presentation/providers/ApodProvider.dart';
// import 'package:zhiyuan_mobile/src/presentation/providers/AsteroidProvider.dart';

final GetIt sl = GetIt.instance;

void setup() {
  // 注册 Dio 实例
  sl.registerLazySingleton<Dio>(() => Dio()); // 注册 Dio

  // // 注册 AsteroidService 和 FetchAsteroidsUseCase
  // getIt.registerLazySingleton<AsteroidService>(
  //   () => AsteroidService(dio: getIt<Dio>()),
  // );
  // getIt.registerLazySingleton<FetchAsteroidsUseCase>(
  //   () => FetchAsteroidsUseCase(getIt<AsteroidService>()),
  // );

  // // 注册 AsteroidProvider
  // getIt.registerFactory<AsteroidProvider>(
  //   () => AsteroidProvider(getIt<FetchAsteroidsUseCase>()),
  // );

  // 注册 ApodService 和 FetchApodUseCase (如果需要继续使用 APOD 功能)
  sl.registerLazySingleton<ApodService>(() => ApodService());
  sl.registerLazySingleton<FetchApodUseCase>(
    () => FetchApodUseCase(sl<ApodService>()),
  );

  // 注册 ApodProvider
  sl.registerFactory<ApodProvider>(() => ApodProvider(sl<FetchApodUseCase>()));

  // 远程数据源
  sl.registerLazySingleton(() => AsteroidRemoteDataSource(sl()));

  // Repository
  sl.registerLazySingleton<AsteroidRepository>(
    () => AsteroidRepositoryImpl(sl()),
  );

  // UseCase
  sl.registerLazySingleton(() => GetAsteroids(sl()));
}
