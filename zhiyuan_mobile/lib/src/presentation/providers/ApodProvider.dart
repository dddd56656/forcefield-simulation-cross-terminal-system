import 'package:flutter/material.dart';

import 'package:get_it/get_it.dart';
import 'package:zhiyuan_mobile/src/domain/entities/ApodEntity.dart';
import 'package:zhiyuan_mobile/src/domain/usecases/FetchApodUseCase.dart';

// 定义 APOD 数据的状态
enum ApodState { loading, loaded, error }

class ApodProvider extends ChangeNotifier {
  final FetchApodUseCase _fetchApodUseCase =
      GetIt.instance<FetchApodUseCase>(); // 获取 APOD 数据的 UseCase

  ApodState _state = ApodState.loading; // 初始状态是 loading
  ApodState get state => _state; // 获取当前的状态

  List<ApodEntity> _apodList = []; // 存储 APOD 数据的列表
  List<ApodEntity> get apodList => _apodList; // 获取 APOD 数据列表

  String _errorMessage = '';

  ApodProvider(Object object); // 错误消息
  String get errorMessage => _errorMessage; // 获取错误消息

  // 获取 APOD 数据的方法，接受日期作为参数
  Future<void> fetchApodData({required String date}) async {
    try {
      _state = ApodState.loading; // 设置状态为加载中
      notifyListeners(); // 通知 UI 更新

      final apodData = await _fetchApodUseCase.execute(
        date: date,
      ); // 根据指定日期获取数据
      if (apodData != null) {
        print("获取到实体数据${apodData.url}");
        _apodList = [apodData]; // 如果成功获取数据，将其添加到列表
        _state = ApodState.loaded; // 设置状态为加载完成
      } else {
        _state = ApodState.error; // 如果没有数据，设置状态为错误
        _errorMessage = 'No data found'; // 错误消息
      }
    } catch (e) {
      _state = ApodState.error; // 如果发生异常，设置状态为错误
      _errorMessage = 'Error: $e'; // 错误消息
    }

    notifyListeners(); // 通知 UI 更新
  }
}
