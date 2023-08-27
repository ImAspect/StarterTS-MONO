export interface JsonResponse {
    status: number
    body: {
        msg: string,
        data: any
    }
}