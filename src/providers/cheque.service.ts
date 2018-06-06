import { Icheque } from './../models/icheque.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { QueryFn } from 'angularfire2/firestore/interfaces';
import { Observable } from 'rxjs/Observable';

import { DocumentReference } from '@firebase/firestore-types';

@Injectable()
export class ChequeService {


    clientCollectionRef: AngularFirestoreCollection<Icheque>;
    clients$: Observable<Icheque[]>;

    constructor(private afs: AngularFirestore) { }

    getCollection$(uid: string, ref?: QueryFn): Observable<Icheque[]> {
        return this.afs.collection<Icheque>(`users/${uid}/clients`, ref)
            .snapshotChanges().map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as Icheque;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            });
    }

    add(uid: string, id_cliente: string, data: Icheque): Promise<DocumentReference> {
        return this.afs.collection<Icheque>(`users/${uid}/clients/${id_cliente}/cheques`).add(data);
    }

    update(id: string, data: Partial<Icheque>): Promise<void> {
        // return this.afs.doc<Client>(`users/${uid}/clients/${id}`).update(data);
        return null;
    }

    remove(id: string): Promise<void> {
        // return this.afs.doc<Client>(`${this.basePath}/${id}`).delete();
        return null;
    }

}