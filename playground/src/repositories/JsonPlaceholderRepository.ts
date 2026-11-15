import axios from 'axios';

const jsonPlaceholderInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

type Photo = {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export class JsonPlaceholderRepository {
  private static instance: JsonPlaceholderRepository;

  private constructor() {}

  public static getInstance(): JsonPlaceholderRepository {
    if (!JsonPlaceholderRepository.instance) {
      JsonPlaceholderRepository.instance = new JsonPlaceholderRepository();
    }
    return JsonPlaceholderRepository.instance;
  }

  public async fetchPhotos(albumId: number) {
    const { data } = await this.wrap<Photo[]>(jsonPlaceholderInstance.get, `/albums/${albumId}/photos`);
    return data;
  }

  private async wrap<T>(
    func:
      | typeof jsonPlaceholderInstance.get<T>
      | typeof jsonPlaceholderInstance.post<T>
      | typeof jsonPlaceholderInstance.put<T>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) {
    try {
      // @ts-expect-error - ignore the type error in the line below.
      return await func(...args);
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
