import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { IComment } from "src/app/shared/interface/comment";
import { CommentService } from "./comment.service";

@Injectable()
export class CommentResolver implements Resolve<IComment[]> {

    constructor(private commentService: CommentService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        return this.commentService.getComments(route.params['id']);
    }
}
