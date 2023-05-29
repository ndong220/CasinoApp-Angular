import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data = [
    { title: 'Recommended (342)', content: 'Weve thoroughly reviewed Wazamba Casino and gave it a good reputation rating. Its generally a good casino to play at, but there are some things worth noting. In our review, weve considered the casinos player complaints, estimated revenues, license, games genuineness, customer support quality, fairness of terms and conditions, withdrawal and win limits, and other factors. Because Wazamba Casino is related to other online casinos listed n limits, and other factors. Because Wazamba Casino is related to other online casinos listed  below, its rating is also influenced by them. Read' },
    { title: 'Big Brands (132)', content: 'Weve thoroughly reviewed Wazamba Casino and gave it a good reputation rating. Its generally a good casino to play at, but there are some things worth noting. In our review, weve considered the casinos player complaints, estimated revenues, license, games genuineness, customer support quality, fairness of terms and conditions, withdrawal and win limits, and other factors. Because Wazamba Casino is related to other online casinos listed n limits, and other factors. Because Wazamba Casino is related to other online casinos listed  below, its rating is also influenced by them. Read' },
    { title: 'Newly Opnened (193)', content: 'Weve thoroughly reviewed Wazamba Casino Weve thoroughly reviewed Wazamba Casino Weve thoroughly reviewed Wazamba Casino Weve thoroughly reviewed Wazamba Casino ' },
    { title: 'All (1982)', content: '' },
  ];
  getData() {
    return this.data;
  }
}
