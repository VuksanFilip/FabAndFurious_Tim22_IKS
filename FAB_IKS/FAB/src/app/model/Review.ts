import { getMatIconNameNotFoundError } from "@angular/material/icon";
import { LoginComponent } from "../components/login/login.component";
import { Ride } from "./Ride";
import { IdEmail } from "./User";

export interface RequestReview{
    rating: number;
    comment: string;
}

export interface Review{
    id: number;
    rating: number;
    comment: string;
    passenger: IdEmail;
}

export interface Reviews{
    vehicleReview: Review;
    driverReview: Review;
}