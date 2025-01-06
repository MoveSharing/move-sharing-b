import {V6Client} from "@aws-amplify/api-graphql";
import {type Schema} from "@/amplify/data/resource";
import {userRepo} from "@/lib/repos/user-repo";

export class Repos {
    user!: ReturnType<typeof userRepo>;
    static instance: Repos;
    constructor(client: V6Client<Schema> | undefined) {
        if (!Repos.instance) {
            this.user = userRepo(client!);
        }else {
            return Repos.instance;
        }
        this.user = userRepo(client!);

    }



}


