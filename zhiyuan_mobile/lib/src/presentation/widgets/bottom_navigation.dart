import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class BottomNavigation extends StatelessWidget {
  final int selectedIndex;
  final Function(int) onItemTapped;

  const BottomNavigation({
    Key? key,
    required this.selectedIndex,
    required this.onItemTapped,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: selectedIndex, // 当前选中的项
      onTap: (index) {
        onItemTapped(index); // 触发点击事件，更新选中项
      },
      selectedItemColor: Colors.black, // 设置选中项的颜色为黑色
      unselectedItemColor: Colors.grey[800], // 设置未选中项的颜色为深灰色
      backgroundColor: Colors.white, // 背景设置为白色
      elevation: 8, // 设置阴影效果，增加立体感
      showSelectedLabels: true, // 显示选中的标签
      showUnselectedLabels: true, // 显示未选中的标签
      type: BottomNavigationBarType.fixed, // 固定类型，确保所有项都平等
      items: <BottomNavigationBarItem>[
        // APOD 页面导航项
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: 'APOD',
          activeIcon: Icon(
            Icons.home_filled,
            color: Colors.black,
          ), // 激活时图标颜色为黑色
        ),
        // 小行星页面导航项
        BottomNavigationBarItem(
          icon: Icon(Icons.star),
          label: 'Asteroids',
          activeIcon: Icon(Icons.star, color: Colors.black), // 激活时图标颜色为黑色
        ),
        // // 搜索页面导航项
        // BottomNavigationBarItem(
        //   icon: Icon(Icons.search),
        //   label: 'Search',
        //   activeIcon: Icon(Icons.search, color: Colors.black), // 激活时图标颜色为黑色
        // ),
        // // 设置页面导航项
        // BottomNavigationBarItem(
        //   icon: Icon(Icons.settings),
        //   label: 'Settings',
        //   activeIcon: Icon(Icons.settings, color: Colors.black), // 激活时图标颜色为黑色
        // ),
      ],
    );
  }
}
