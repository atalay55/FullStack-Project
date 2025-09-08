"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
let PostsService = class PostsService {
    constructor() {
        this.posts = [
            { id: 1, userId: 1, title: 'Hello World' },
            { id: 2, userId: 2, title: 'NestJS Rocks' },
        ];
    }
    findAll() {
        return this.posts;
    }
    findOne(id) {
        return this.posts.find(p => p.id === id);
    }
    create(post) {
        const newPost = Object.assign({ id: this.posts.length + 1 }, post);
        this.posts.push(newPost);
        return newPost;
    }
    update(id, postData) {
        const post = this.findOne(id);
        if (post)
            Object.assign(post, postData);
        return post;
    }
    remove(id) {
        const index = this.posts.findIndex(p => p.id === id);
        if (index !== -1) {
            this.posts.splice(index, 1);
            return true;
        }
        return false;
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)()
], PostsService);
//# sourceMappingURL=posts.service.js.map