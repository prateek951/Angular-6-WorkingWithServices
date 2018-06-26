import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, BaseRequestOptions, Http } from '@angular/http';
import { AuthHttp, AUTH_PROVIDERS,provideAuth,AuthConfig} from 'angular2-jwt';
import { PostService } from './services/post.service';
import { AppErrorHandler } from './common/app-error-handler';
import { GithubFollowersComponent } from './github-followers/github-followers.component';
import { GithubFollowersService } from './services/github-followers.service';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { OrderService } from './services/order.service';
import { AuthService } from './services/auth.service';
import { fakeBackendProvider } from './helpers/fakebackend';
import { MockBackend } from '@angular/http/testing';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminAuthguardService } from './services/admin-authguard.service';

export function getAuthHttp(http){
  return new AuthHttp(new AuthConfig({
    tokenName: 'token'
  }),http);
}


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    GithubFollowersComponent,
    NavbarComponent,
    NotFoundComponent,
    HomeComponent,
    GithubProfileComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '',component: HomeComponent },
      { path: 'followers/:id',component: GithubProfileComponent },
      { path: 'followers',component: GithubFollowersComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'admin', component: AdminComponent,
      canActivate:[AuthGuardService,AdminAuthguardService]},
      { path: 'register',component: RegisterComponent},
      { path: 'login', component: LoginComponent},
      { path: 'no-access', component: NoAccessComponent},
      { path: '**',component: NotFoundComponent }
    ])
  ],
  providers: [
    PostService,
    GithubFollowersService,
    OrderService,
    AuthService,
    AuthGuardService,
    AdminAuthguardService,
    AuthHttp,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
