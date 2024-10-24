declare class ApiFeatures {
    query: string;
    queryString: {
        [key: string]: any;
    };
    args: any[];
    queryObjString: string;
    addWhereClause: boolean;
    noQueryFor: string[];
    includeIdsInWhereClause: string[];
    dontSplitDashesfor: string[];
    nestedFiltering: string[];
    nestedFilteringObjValue: string[];
    useSpecialQuery: boolean;
    specialQueryString: string;
    booleanQueryStrings: string[];
    constructor(constructorObj: {
        query: string;
        queryString: {
            [key: string]: any;
        };
        args?: any[];
        queryObjString?: string;
        addWhereClause?: boolean;
        noQueryFor?: string[];
        includeIdsInWhereClause?: string[];
        dontSplitDashesfor?: string[];
        nestedFiltering?: string[];
        nestedFilteringObjValue?: string[];
        booleanQueryStrings?: string[];
        useSpecialQuery?: boolean;
        specialQueryString?: string;
    });
    filter(): this;
    sort(dontSorttAutomatically?: boolean): this;
    paginate(): this;
}
export default ApiFeatures;
