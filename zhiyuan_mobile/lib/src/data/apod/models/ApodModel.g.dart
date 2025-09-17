// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ApodModel.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ApodModel _$ApodModelFromJson(Map<String, dynamic> json) => ApodModel(
  date: json['date'] as String?,
  explanation: json['explanation'] as String?,
  url: json['hdurl'] as String?,
  mediaType: json['mediaType'] as String?,
  title: json['title'] as String?,
  copyright: json['copyright'] as String?,
);

Map<String, dynamic> _$ApodModelToJson(ApodModel instance) => <String, dynamic>{
  'date': instance.date,
  'explanation': instance.explanation,
  'hdurl': instance.url,
  'mediaType': instance.mediaType,
  'title': instance.title,
  'copyright': instance.copyright,
};
