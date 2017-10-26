import PATHS from '../config/paths';
import MapMeta from './mapMeta';
import http from '../modules/http';
import Utils from '../modules/utils/utils';

class MapService {
  private mapMetaArr: MapMeta[];

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

  public getMaps(force?: boolean): MapMeta[] {
    if (!force) {
      return this.mapMetaArr;
    }
    else {
      this.getMapsFromServer();
      return this.mapMetaArr;
    }
  }

  private getMapsFromServer(sort?: string): void {
    http.prGet(`${PATHS.GET_MAPS_PATH}?sort=${sort || 'rating'}`)
      .then((data: any) => this.mapMetaArr = data as MapMeta[])
      .catch((err) => {
        this.mapMetaArr = undefined;
        Utils.debugWarn(err);
      });
  }

  // private loadedMap: Map;
}

export default new MapService();
