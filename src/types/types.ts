export interface RegisterUserData {
    name: string,
    email: string,
    password: string
}

export interface LoginUserData {
    email: string,
    password: string
}

export interface RecipeData {
    name: string,
    imageUrl: string,
    prepTime: string,
    difficulty: string,
    ingredients: string[],
    steps: string[],
    servings: number
}

export interface FavoriteData {
    userId: string,
    recipeId: string
}