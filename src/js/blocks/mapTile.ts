import router from '../modules/router';
import ViewPaths from '../views/pagePaths';

import '../../img/img_placeholder.jpg';

export default class MapTile {
    constructor(mapMeta: Map.Meta) {
        this.mapMeta = mapMeta;
    }

    public renderElement(): HTMLElement {
        if (this.htmlElement) {
            return this.htmlElement;
        }

        this.htmlElement = document.createElement('div');
        this.htmlElement.classList.add(
            'main-frame__lobby-content__maps__map-tile');

        const image = document.createElement('img');
        image.classList.add('main-frame__lobby-content__maps__map-tile__img');
        image.setAttribute('src', this.mapMeta.preview || '/static/img/img_placeholder.jpg');
        this.htmlElement.appendChild(image);

        const mapName = document.createElement('p');
        mapName.innerText = this.mapMeta.name;
        mapName.classList.add('main-frame__lobby-content__maps__map-tile__name');
        this.htmlElement.appendChild(mapName);

        const playersCount = document.createElement('p');
        playersCount.innerHTML = `Players: ${this.mapMeta.players} / 4`;
        playersCount.classList.add('main-frame__lobby-content__maps__map-tile__name');
        this.htmlElement.appendChild(playersCount);

        return this.htmlElement;
    }

    public onClick(callback: (event) => any) {
        this.htmlElement.addEventListener('click', callback);
    }


    private mapMeta: Map.Meta;
    private htmlElement: HTMLElement;
}
