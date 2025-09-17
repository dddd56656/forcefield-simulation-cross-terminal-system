import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:zhiyuan_mobile/src/presentation/screens/ApodScreen.dart';
import 'package:zhiyuan_mobile/src/presentation/screens/asteroid_screen.dart';
import 'package:zhiyuan_mobile/src/presentation/widgets/bottom_navigation_wrapper.dart';

// 路由配置类，用于管理所有路由的定义
class AppRoutes {
  // GoRouter 用于声明式路由管理
  static final GoRouter router = GoRouter(
    initialLocation: '/apod', // 默认跳转到首页（APOD页面）
    routes: [
      // APOD 屏幕路由
      GoRoute(
        path: '/apod',
        builder: (context, state) {
          return const BottomNavigationWrapper(
            selectedIndex: 0, // 设置底部导航选中项为 0
            child: ApodScreen(), // 显示 APOD 页面
          );
        },
      ),
      // Asteroids 页面路由
      GoRoute(
        path: '/asteroids',
        builder: (context, state) {
          return const BottomNavigationWrapper(
            selectedIndex: 1, // 设置底部导航选中项为 1
            child: AsteroidScreen(), // 显示 Asteroid 页面
          );
        },
      ),
      // // 搜索页路由
      // GoRoute(
      //   path: '/search',
      //   builder: (context, state) {
      //     return const BottomNavigationWrapper(
      //       selectedIndex: 2, // 设置底部导航选中项为 2
      //       child: SearchPage(), // 显示搜索页面
      //     );
      //   },
      // ),
      // // 设置页路由
      // GoRoute(
      //   path: '/settings',
      //   builder: (context, state) {
      //     return const BottomNavigationWrapper(
      //       selectedIndex: 3, // 设置底部导航选中项为 3
      //       child: SettingsPage(), // 显示设置页面
      //     );
      //   },
      // ),
    ],
  );
}

class SettingsPage extends StatelessWidget {
  const SettingsPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Settings')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Settings',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            ListTile(
              title: const Text('Enable Notifications'),
              trailing: Switch(
                value: true, // 默认开启
                onChanged: (bool value) {},
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // 点击按钮时做一些操作，比如保存设置
                ScaffoldMessenger.of(
                  context,
                ).showSnackBar(const SnackBar(content: Text('Settings Saved')));
              },
              child: const Text('Save Settings'),
            ),
          ],
        ),
      ),
    );
  }
}

class SearchPage extends StatelessWidget {
  const SearchPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Search')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const Text(
              'Search for APOD',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            TextField(
              decoration: const InputDecoration(
                labelText: 'Enter date (YYYY-MM-DD)',
                border: OutlineInputBorder(),
              ),
              onChanged: (value) {
                // 用于处理输入框内容
              },
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // 点击按钮时进行搜索
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Searching for APOD...')),
                );
              },
              child: const Text('Search'),
            ),
          ],
        ),
      ),
    );
  }
}
