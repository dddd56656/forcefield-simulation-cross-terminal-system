import 'package:json_annotation/json_annotation.dart';

part 'ApodModel.g.dart';

@JsonSerializable()
class ApodModel {
  final String? date; // 图片日期
  final String? explanation; // 图片解释
  @JsonKey(name: 'hdurl') // 将 JSON 中的 'hdurl' 映射到模型中的 'url'
  final String? url; // 图片 URL
  final String? mediaType; // 媒体类型（图片/视频）
  final String? title; // 图片标题
  final String? copyright; // 图片版权

  ApodModel({
    required this.date,
    required this.explanation,
    required this.url,
    required this.mediaType,
    required this.title,
    this.copyright,
  });

  // 通过生成的代码将 JSON 转为模型对象
  factory ApodModel.fromJson(Map<String, dynamic> json) =>
      _$ApodModelFromJson(json);

  // 通过生成的代码将模型对象转为 JSON
  Map<String, dynamic> toJson() => _$ApodModelToJson(this);
}
