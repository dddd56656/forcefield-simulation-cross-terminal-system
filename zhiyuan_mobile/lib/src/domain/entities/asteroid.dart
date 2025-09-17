// entity/asteroid.dart
class Asteroid {
  final String id; // id 应该是 String 类型
  final String name;
  final String closeApproachDate;
  final double estimatedDiameterMin;
  final double estimatedDiameterMax;
  final String nasaJplUrl;
  final bool isPotentiallyHazardous;
  final String relativeVelocity;
  final String missDistance;
  final String orbitingBody;

  Asteroid({
    required this.id,
    required this.name,
    required this.closeApproachDate,
    required this.estimatedDiameterMin,
    required this.estimatedDiameterMax,
    required this.nasaJplUrl,
    required this.isPotentiallyHazardous,
    required this.relativeVelocity,
    required this.missDistance,
    required this.orbitingBody,
  });

  factory Asteroid.fromJson(Map<String, dynamic> json) {
    final closeApproachData = json['close_approach_data'][0]; // 取第一个接近日期

    return Asteroid(
      id: json['id'], // id 应该是 String 类型
      name: json['name'],
      closeApproachDate: closeApproachData['close_approach_date'],
      estimatedDiameterMin:
          json['estimated_diameter']['kilometers']['estimated_diameter_min'],
      estimatedDiameterMax:
          json['estimated_diameter']['kilometers']['estimated_diameter_max'],
      nasaJplUrl: json['nasa_jpl_url'],
      isPotentiallyHazardous: json['is_potentially_hazardous_asteroid'],
      relativeVelocity:
          closeApproachData['relative_velocity']['kilometers_per_hour'],
      missDistance: closeApproachData['miss_distance']['kilometers'],
      orbitingBody: closeApproachData['orbiting_body'],
    );
  }
}
