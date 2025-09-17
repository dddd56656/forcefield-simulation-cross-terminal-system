class ApodEntity {
  final String? date; // 图片日期
  final String? explanation; // 图片解释
  final String? url; // 图片的 URL
  final String? mediaType; // 媒体类型（图片或视频）
  final String? title; // 图片标题
  final String? copyright; // 图片版权信息（可选）

  ApodEntity({
    required this.date,
    required this.explanation,
    required this.url,
    required this.mediaType,
    required this.title,
    this.copyright,
  });
}
