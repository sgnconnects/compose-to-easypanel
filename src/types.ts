export interface DockerYml {
  version: string;
  services: {
    [key: string]: DockerService;
  };
}

export interface DockerService {
  container_name?: string;
  image?: string;
  ports?: string[];
  environment?: { [key: string]: string };
  volumes?: string[];
  command?: string;
}
