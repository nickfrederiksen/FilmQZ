declare namespace ns.Resources {
    export interface ICrudResource<TUpdateModel, TCreateModel> {
        GetAll();
        GetSingle(id: string);
        Update(id: string, model: TUpdateModel);
        Create(model: TCreateModel);
        Delete(id: string);
    }

    export interface IGameIdCrudResource<TUpdateModel, TCreateModel> {
        GetAll(gameId: string);
        GetSingle(gameId: string, id: string);
        Update(gameId: string, id: string, model: TUpdateModel);
        Create(gameId: string, model: TCreateModel);
        Delete(gameId: string, id: string);
    }

    export interface IRoundIdCrudResource<TUpdateModel, TCreateModel> {
        GetAll(gameId: string, roundId: string);
        GetSingle(gameId: string, roundId: string, id: string);
        Update(gameId: string, roundId: string, id: string, model: TUpdateModel);
        Create(gameId: string, roundId: string, model: TCreateModel);
        Delete(gameId: string, roundId: string, id: string);
    }
}