import PATHS from '../config/paths';
import Utils from '../modules/utils/utils';
import http from './HttpService';

class MapService {
  private mapMetaArr: Map.Meta[];

  constructor() {
    this.mapMetaArr = [];
  }

  // public getMap(id: number): Map {
  //     http.prGet(`${PATHS.GET_MAP}/${id}`)
  //         .then((data) => this.loadedMap = data as Map)
  //         .catch((err) => {
  //             this.loadedMap = undefined;
  //             Utils.debugWarn(err)
  //         });

  //     return this.loadedMap;
  // }

  public getMaps(force?: boolean, offline?: boolean): Promise<any> {
    if (!force) {
      return new Promise(() => this.mapMetaArr);
    }
    else {
      return this.getMapsFromServer(offline);
    }
  }

  private getMapsFromServer(offline?: boolean, sort?: string): Promise<any> {
    return http.Get(`${PATHS.GET_MAPS_PATH}?sort=${sort || 'rating'}${offline ? '&offline=true' : ''}`)
      .then((data: any) => {
        this.mapMetaArr = data.body as Map.Meta[];
        return this.mapMetaArr;
      })
      .catch((err) => {
        this.mapMetaArr = undefined;
        Utils.debugWarn(err);
      });
  }

  // private loadedMap: Map;
}

export default new MapService();
