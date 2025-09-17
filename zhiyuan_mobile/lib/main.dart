import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:zhiyuan_mobile/src/core/DependencyInjection.dart';
import 'package:zhiyuan_mobile/src/data/apod/repositories/asteroid_repository_impl.dart';
import 'package:zhiyuan_mobile/src/domain/usecases/FetchApodUseCase.dart';
import 'package:zhiyuan_mobile/src/domain/usecases/get_asteroids.dart';
import 'package:zhiyuan_mobile/src/presentation/providers/ApodProvider.dart';
import 'package:zhiyuan_mobile/src/routes/app_routes.dart';
import 'package:zhiyuan_mobile/src/data/datasources/asteroid_remote_data_source.dart'; // 确保引用了数据源

void main() {
  setup(); // 初始化依赖注入
  runApp(
    MultiProvider(
      providers: [
        // 注册 ApodProvider
        ChangeNotifierProvider(
          create: (context) => ApodProvider(sl<FetchApodUseCase>()),
        ),
        // 注册 GetAsteroids Provider
        Provider(
          create: (context) => GetAsteroids(
            AsteroidRepositoryImpl(AsteroidRemoteDataSource(Dio())),
          ),
        ),
      ],
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'APOD App',
      theme: ThemeData(primarySwatch: Colors.blue),
      routerConfig: AppRoutes.router, // 配置 GoRouter
    );
  }
}
