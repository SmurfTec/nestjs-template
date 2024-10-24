"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateEntries = [
    'createdAt',
    'updatedAt',
    'deletedAt',
    'created_on',
    'updated_on',
    'deleted_on',
];
class ApiFeatures {
    constructor(constructorObj) {
        this.args = [];
        this.addWhereClause = true;
        this.noQueryFor = [];
        this.includeIdsInWhereClause = [];
        this.dontSplitDashesfor = [];
        this.nestedFiltering = [];
        this.nestedFilteringObjValue = [];
        this.useSpecialQuery = false;
        this.specialQueryString = ``;
        this.booleanQueryStrings = [];
        this.query = constructorObj.query;
        this.queryString = constructorObj.queryString;
        this.args = constructorObj.args || [];
        this.queryObjString = constructorObj.queryObjString;
        this.addWhereClause = constructorObj.addWhereClause || true;
        this.noQueryFor = constructorObj.noQueryFor || [];
        this.includeIdsInWhereClause = constructorObj.includeIdsInWhereClause || [];
        this.dontSplitDashesfor = constructorObj.dontSplitDashesfor || [];
        this.nestedFiltering = constructorObj.nestedFiltering || [];
        this.nestedFilteringObjValue = constructorObj.nestedFilteringObjValue || [];
        this.booleanQueryStrings = constructorObj.booleanQueryStrings || [];
        this.useSpecialQuery = constructorObj.useSpecialQuery || false;
        this.specialQueryString = constructorObj.specialQueryString || ``;
    }
    filter() {
        const queryObj = Object.assign({}, this.queryString);
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el) => delete queryObj[el]);
        const queryStr = JSON.stringify(queryObj);
        if (this.useSpecialQuery) {
            this.query = `${this.query} ${this.specialQueryString}`;
            this.addWhereClause = false;
        }
        if (queryStr !== '{}') {
            this.query = this.addWhereClause
                ? `${this.query} WHERE`
                : `${this.query} AND`;
            Object.keys(queryObj).forEach((key) => {
                if (queryObj[key].includes('[')) {
                    queryObj[key] = queryObj[key].replace('[', '').replace(']', '');
                    queryObj[key] = queryObj[key].split(',');
                }
            });
            Object.entries(queryObj).forEach((entry, index) => {
                if (Array.isArray(entry[1])) {
                    let inClause = '';
                    entry[1].forEach((value, index) => {
                        if (index > 0) {
                            inClause += ',';
                        }
                        if (this.includeIdsInWhereClause.includes(entry[0]))
                            inClause += ` '${value}'`;
                        else
                            inClause += ` ${value}`;
                    });
                    if (this.noQueryFor.includes(entry[0])) {
                        if (this.includeIdsInWhereClause.includes(entry[0]))
                            this.query += ` ${entry[0]}->>'id' IN (${inClause})`;
                        else
                            this.query += ` ${entry[0]} IN (${inClause})`;
                    }
                    else {
                        if (this.includeIdsInWhereClause.includes(entry[0]))
                            this.query += ` ${this.queryObjString}${entry[0]}->>'id' IN (${inClause})`;
                        else
                            this.query += ` ${this.queryObjString}${entry[0]} IN (${inClause})`;
                    }
                }
                else {
                    let isLike = this.booleanQueryStrings.includes(entry[0])
                        ? false
                        : true;
                    if (isLike &&
                        !entry[1].startsWith('%') &&
                        !entry[1].endsWith('%')) {
                        entry[1] = `%${entry[1]}%`;
                    }
                    if (index > 0) {
                        this.query += ' AND';
                    }
                    if (entry[1].includes('-') &&
                        !this.dontSplitDashesfor.includes(entry[0])) {
                        let values;
                        if (dateEntries.includes(entry[0])) {
                            values = entry[1].split('Z-');
                            values[0] += 'Z';
                            values = values.map((value) => `'${value}'`);
                        }
                        else
                            values = entry[1].split('-');
                        if (this.includeIdsInWhereClause.includes(entry[0]))
                            this.query += ` ${this.queryObjString}${entry[0]}->>'id' BETWEEN '${values[0]}' AND '${values[1]}'`;
                        else
                            this.query += ` ${this.queryObjString}${entry[0]} BETWEEN ${values[0]} AND ${values[1]}`;
                    }
                    else {
                        entry[1] = entry[1].replace(/%20/g, ' ');
                        if (this.noQueryFor.includes(entry[0])) {
                            if (this.includeIdsInWhereClause.includes(entry[0]))
                                this.query += ` ${entry[0]}->>'id' ${isLike ? 'ILIKE ' : '='} '${entry[1]}'`;
                            else
                                this.query += ` ${entry[0]} ${isLike ? 'ILIKE ' : '='} '${entry[1]}'`;
                        }
                        else {
                            if (this.includeIdsInWhereClause.includes(entry[0]))
                                this.query += ` ${this.queryObjString}${entry[0]}->>'id' 
                 ${isLike ? 'ILIKE' : '='}  '${entry[1]}'`;
                            else if (this.nestedFiltering.includes(entry[0])) {
                                const queryObjStringForEl = this.nestedFilteringObjValue[this.nestedFiltering.indexOf(entry[0])];
                                this.query += ` ${queryObjStringForEl}${entry[0]} ${isLike ? 'ILIKE ' : '='} '${entry[1]}'`;
                            }
                            else
                                this.query += ` ${this.queryObjString}${entry[0]} ${isLike ? 'ILIKE ' : '='} '${entry[1]}'`;
                        }
                    }
                }
            });
        }
        return this;
    }
    sort(dontSorttAutomatically = false) {
        if (this.queryString.sort) {
            this.query += ` ORDER BY ${this.queryObjString && this.queryObjString}`;
            this.queryString.sort
                .split(',')
                .forEach((orderBy, index) => {
                if (index > 0) {
                    this.query += ',';
                }
                this.query += ` ${orderBy.replace('-', '')}`;
                const isDescending = orderBy.includes('-');
                if (isDescending) {
                    this.query += ' DESC';
                }
                else {
                    this.query += ' ASC';
                }
            });
        }
        else {
            if (dontSorttAutomatically)
                return this;
            else {
                this.query += ` ORDER BY ${this.queryObjString && this.queryObjString}id DESC`;
            }
        }
        return this;
    }
    paginate() {
        if (this.queryString.page && this.queryString.limit) {
            const page = this.queryString.page * 1 || 1;
            const limit = this.queryString.limit * 1 || 100;
            const skip = (page - 1) * limit;
            this.query += ` LIMIT ${limit} OFFSET ${skip} `;
        }
        return this;
    }
}
exports.default = ApiFeatures;
//# sourceMappingURL=api-features.js.map