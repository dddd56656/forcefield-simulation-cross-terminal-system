import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'bottom_navigation.dart'; // 引入底部导航栏组件

class BottomNavigationWrapper extends StatefulWidget {
  final int selectedIndex; // 当前选中的底部导航索引
  final Widget child; // 当前页面内容

  const BottomNavigationWrapper({
    Key? key,
    required this.selectedIndex,
    required this.child,
  }) : super(key: key);

  @override
  _BottomNavigationWrapperState createState() =>
      _BottomNavigationWrapperState();
}

class _BottomNavigationWrapperState extends State<BottomNavigationWrapper> {
  late int _currentIndex;

  @override
  void initState() {
    super.initState();
    _currentIndex = widget.selectedIndex; // 初始化为传入的 selectedIndex
  }

  // 处理底部导航点击事件
  void _onItemTapped(int index) {
    setState(() {
      _currentIndex = index; // 更新当前选中的索引
    });

    // 根据底部导航的选中项跳转到相应的页面
    switch (index) {
      case 0:
        context.go('/apod'); // 跳转到 APOD 页面
        break;
      case 1:
        context.go('/asteroids'); // 跳转到小行星页面
        break;
      // case 2:
      //   context.go('/search'); // 跳转到搜索页面
      //   break;
      // case 3:
      //   context.go('/settings'); // 跳转到设置页面
      //   break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: widget.child, // 显示页面内容
      bottomNavigationBar: BottomNavigation(
        selectedIndex: _currentIndex, // 当前选中的底部导航索引
        onItemTapped: _onItemTapped, // 底部导航点击回调
      ),
    );
  }
}
