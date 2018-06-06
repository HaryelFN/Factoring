import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class GlobalService {
    constructor(private storage: Storage) {
    }

    async getCurrentUser() {
        const usr = await this.storage.get('user');
        return JSON.parse(usr);
    }

    setCurrentUser(user) {
        this.storage.set('user', JSON.stringify(user));
    }

    setTypeUser(type) {
        this.storage.set('typeUser', type);
    }

    async getTypeUser() {
        const typeUser = await this.storage.get('typeUser');
        return typeUser;
    }
}