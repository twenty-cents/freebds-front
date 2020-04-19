import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

// Angular Material
import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';

// Prime NG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import {SidebarModule} from 'primeng/sidebar';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PanelModule} from 'primeng/panel';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {SplitButtonModule} from 'primeng/splitbutton';
import {LightboxModule} from 'primeng/lightbox';
import {MessageModule} from 'primeng/message';
import {RatingModule} from 'primeng/rating';

// FreeBds
// - Common components
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/commons/top-bar/top-bar.component';
import { SidebarLeftComponent } from './components/commons/sidebar-left/sidebar-left.component';
import { ResizeService } from './services/commons/resize.service';
import { SizeDetectorComponent } from './components/commons/size-detector/size-detector.component';
import { BreadcrumbMainComponent } from './components/commons/breadcrumb-main/breadcrumb-main.component';
import { MyPaginatorComponent } from './components/commons/my-paginator/my-paginator.component';
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { LoginComponent } from './components/security/login/login.component';
// - Referential
import { FreeSearchManagerComponent } from './components/referential/free-search/free-search-manager/free-search-manager.component';
import { FreeSearchFiltersComponent } from './components/referential/free-search/free-search-filters/free-search-filters.component';
// Series
import { SeriesTableComponent } from './components/series/series-table/series-table.component';
import { SerieItemComponent } from './components/series/serie-item/serie-item.component';
// Graphic novels
import { GraphicNovelsListComponent } from './components/graphic-novels/graphic-novels-list/graphic-novels-list.component';
import { GraphicNovelItemComponent } from './components/graphic-novels/graphic-novel-item/graphic-novel-item.component';
// Authors
import { AuthorItemComponent } from './components/authors/author-item/author-item.component';
import { SeriesByLetterComponent } from './components/series/series-by-letter/series-by-letter.component';
import { NavigateComponent } from './components/referential/navigate/navigate.component';
import { AuthorsTableComponent } from './components/authors/authors-table/authors-table.component';
import { AuthorsTableByLetterComponent } from './components/authors/authors-table-by-letter/authors-table-by-letter.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { OriginsComponent } from './components/dashboard/origins/origins.component';
import { Origins2Component } from './components/dashboard/origins2/origins2.component';
import { GraphicNovelsTableComponent } from './components/graphic-novels/graphic-novels-table/graphic-novels-table.component';
import { GraphicNovelPageComponent } from './components/graphic-novels/graphic-novel-page/graphic-novel-page.component';
import { GraphicsNovelsListXsComponent } from './components/graphic-novels/graphics-novels-list-xs/graphics-novels-list-xs.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/security/profile/profile.component';
import { RegisterComponent } from './components/security/register/register.component';



@NgModule({
    declarations: [
        AppComponent,
        TopBarComponent,
        SidebarLeftComponent,
        SizeDetectorComponent,
        BreadcrumbMainComponent,
        MyPaginatorComponent,
        // Referential
        FreeSearchManagerComponent,
        FreeSearchFiltersComponent,
        // Series
        SeriesTableComponent,
        SerieItemComponent,
        // Graphic novels
        GraphicNovelsListComponent,
        GraphicNovelItemComponent,
        // Authors
        AuthorItemComponent,
        SeriesByLetterComponent,
        NavigateComponent,
        AuthorsTableComponent,
        AuthorsTableByLetterComponent,
        DashboardComponent,
        OriginsComponent,
        Origins2Component,
        GraphicNovelsTableComponent,
        GraphicNovelPageComponent,
        GraphicsNovelsListXsComponent,
        LoginComponent,
        HomeComponent,
        ProfileComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'}),
        AppRoutingModule,
        // Angular Material
        A11yModule,
        ClipboardModule,
        CdkStepperModule,
        CdkTableModule,
        CdkTreeModule,
        DragDropModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        PortalModule,
        ScrollingModule,
        // Prime NG
        CommonModule,
        TableModule,
        InputTextModule,
        DialogModule,
        SidebarModule,
        ButtonModule,
        PanelMenuModule,
        PanelModule,
        BreadcrumbModule,
        SplitButtonModule,
        LightboxModule,
        MessageModule,
        RatingModule
    ],
    providers: [
        ResizeService,
        authInterceptorProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
