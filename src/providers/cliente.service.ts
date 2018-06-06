import { Injectable } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { QueryFn } from 'angularfire2/firestore/interfaces';
import { Observable } from 'rxjs/Observable';

import { Client } from './../models/client.model';
import { DocumentReference } from '@firebase/firestore-types';
import { GlobalService } from './global/global.service';

@Injectable()
export class ClienteService {

    private uid: string;
    private basePath = `users/${this.uid}/clients/`;

    clientCollectionRef: AngularFirestoreCollection<Client>;
    clients$: Observable<Client[]>;

    constructor(
        private afs: AngularFirestore,
        private globalService: GlobalService) {

        this.globalService.getCurrentUser().then((user) => {
            if (user) {
                this.uid = user.uid;
            } else {
                //this.navCtrl.setRoot('HomePage');
            }
        });
    }

    getCollection$(uid: string, ref?: QueryFn): Observable<Client[]> {
        return this.afs.collection<Client>(`users/${uid}/clients`, ref)
            .snapshotChanges().map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as Client;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            });
    }

    add(uid: string, data: Client): Promise<DocumentReference> {
        return this.afs.collection<Client>(`users/${uid}/clients`).add(data);
    }

    update(uid: string, id: string, data: Partial<Client>): Promise<void> {
        return this.afs.doc<Client>(`users/${uid}/clients/${id}`).update(data);
    }

    remove(uid: string, id: string): Promise<void> {
        return this.afs.doc<Client>(`users/${uid}/clients/${id}`).delete();
    }

}