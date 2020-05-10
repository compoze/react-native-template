export class Location {
  public readonly latitude: number;
  public readonly longitude: number;
  public readonly name: string;
  public readonly description: string;

  public constructor(params: Partial<Location> = {}) {
    const { latitude, longitude, name = '', description = '' } = params;

    this.latitude = latitude!;
    this.longitude = longitude!;
    this.name = name;
    this.description = description;
  }
}
