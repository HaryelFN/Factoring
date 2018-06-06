import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { QueryFn } from 'angularfire2/firestore/interfaces';
import { Observable } from 'rxjs/Observable';

import { Iuser } from './../models/iuser.model';

@Injectable()
export class UserService {

    private basePath: string = 'users';

    constructor(private afs: AngularFirestore) { }

    getCollection$(ref?: QueryFn): Observable<Iuser[]> {

        console.log('start metodo serve: ref' + ref);

        return this.afs.collection<Iuser>(this.basePath, ref)
            .snapshotChanges().map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as Iuser;
                    console.log('service; ' + data);
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            });
    }

    getUserByUid(uid: string): Observable<Iuser> {
        return this.afs.doc<Iuser>(`users/${uid}`).valueChanges();
        //this.animalInfo = docRef.valueChanges()
    }

    add(uid: string, data: Partial<Iuser>): Promise<void> {
        //ATENÇÃO!! USAR OBJECT JAVASCRIPT PURO PARA ENVIAR DADOS. NAO OBJS PERSONALIZADOS
        return this.afs.collection<Iuser>(this.basePath).doc(uid).set(Object.assign({}, data));
    }

    update(id: string, data: Partial<Iuser>): Promise<void> {
        return this.afs.doc<Iuser>(`${this.basePath}/${id}`).update(data);
    }

    remove(id: string): Promise<void> {
        return this.afs.doc<Iuser>(`${this.basePath}/${id}`).delete();
    }

}