const dateEntries = [
  'createdAt',
  'updatedAt',
  'deletedAt',
  'created_on',
  'updated_on',
  'deleted_on',
];

class ApiFeatures {
  public query: string;
  public queryString: {
    // * object with string keys and any values
    [key: string]: any;
  };
  public args: any[] = [];
  public queryObjString: string;
  public addWhereClause: boolean = true;
  public noQueryFor: string[] = [];
  public includeIdsInWhereClause: string[] = [];
  public dontSplitDashesfor: string[] = [];
  public nestedFiltering: string[] = [];
  public nestedFilteringObjValue: string[] = [];
  public useSpecialQuery: boolean = false;
  public specialQueryString: string = ``;
  public booleanQueryStrings: string[] = [];

  constructor(constructorObj: {
    query: string;
    queryString: {
      // * object with string keys and any values
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
  }) {
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

  public filter() {
    const queryObj: object & {
      // * object with string keys and any values
      [key: string]: any;
    } = Object.assign({}, this.queryString);

    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    const queryStr = JSON.stringify(queryObj);

    if (this.useSpecialQuery) {
      this.query = `${this.query} ${this.specialQueryString}`;
      this.addWhereClause = false;
    }

    // * Add where clause to query
    if (queryStr !== '{}') {
      this.query = this.addWhereClause
        ? `${this.query} WHERE`
        : `${this.query} AND`;

      // * Convert array like string to array
      // * e.g { id: '[11,7,3]', firstName: 'Niko' } => { id: [11,7,3], firstName: 'Niko' }
      Object.keys(queryObj).forEach((key: string) => {
        if (queryObj[key].includes('[')) {
          queryObj[key] = queryObj[key].replace('[', '').replace(']', '');
          queryObj[key] = queryObj[key].split(',');
        }
      });

      Object.entries(queryObj).forEach(
        (entry: [string, string], index: number) => {
          // * If value is an array, add IN clause
          // * e.g { id: [11,7,3], firstName: 'Niko' } => WHERE id IN (11,7,3) AND firstName = 'Niko'

          if (Array.isArray(entry[1])) {
            let inClause = '';
            entry[1].forEach((value: string, index: number) => {
              if (index > 0) {
                inClause += ',';
              }

              if (this.includeIdsInWhereClause.includes(entry[0]))
                inClause += ` '${value}'`;
              else inClause += ` ${value}`;
              // this.args.push(value);
            });

            if (this.noQueryFor.includes(entry[0])) {
              if (this.includeIdsInWhereClause.includes(entry[0]))
                this.query += ` ${entry[0]}->>'id' IN (${inClause})`;
              else this.query += ` ${entry[0]} IN (${inClause})`;
            } else {
              if (this.includeIdsInWhereClause.includes(entry[0]))
                this.query += ` ${this.queryObjString}${entry[0]}->>'id' IN (${inClause})`;
              else
                this.query += ` ${this.queryObjString}${entry[0]} IN (${inClause})`;
            }
          } else {
            let isLike = this.booleanQueryStrings.includes(entry[0])
              ? false
              : true;

            if (
              isLike &&
              !entry[1].startsWith('%') &&
              !entry[1].endsWith('%')
            ) {
              entry[1] = `%${entry[1]}%`;
            }
            // if (entry[1].endsWith('%')) {
            //   isLike = true;
            // }

            // * If value is not an array, add = clause
            // * e.g { id: 11, firstName: 'Niko' } => WHERE id = 11 AND firstName = 'Niko'
            if (index > 0) {
              // this.query += ' OR';
              this.query += ' AND';
            }

            // * if value is like 11-12 , add BETWEEN clause
            // * e.g { id: '11-12', firstName: 'Niko' } => WHERE id BETWEEN 11 AND 12 AND firstName = 'Niko'
            if (
              entry[1].includes('-') &&
              !this.dontSplitDashesfor.includes(entry[0])
            ) {
              let values;

              if (dateEntries.includes(entry[0])) {
                // 2023-07-10T15:33:05.979Z-2023-07-16T15:33:05.979Z
                // * Split from - coming right after first Z
                values = entry[1].split('Z-');
                // * Add Z back to the end of the first value
                values[0] += 'Z';

                // * Add single quotes to the values
                values = values.map((value: string) => `'${value}'`);
              } else values = entry[1].split('-');

              if (this.includeIdsInWhereClause.includes(entry[0]))
                this.query += ` ${this.queryObjString}${entry[0]}->>'id' BETWEEN '${values[0]}' AND '${values[1]}'`;
              else
                this.query += ` ${this.queryObjString}${entry[0]} BETWEEN ${values[0]} AND ${values[1]}`;
              // this.args.push();
              // this.args.push();
            } else {
              // replace %20 with space
              entry[1] = entry[1].replace(/%20/g, ' ');
              if (this.noQueryFor.includes(entry[0])) {
                if (this.includeIdsInWhereClause.includes(entry[0]))
                  this.query += ` ${entry[0]}->>'id' ${
                    isLike ? 'ILIKE ' : '='
                  } '${entry[1]}'`;
                else
                  this.query += ` ${entry[0]} ${isLike ? 'ILIKE ' : '='} '${
                    entry[1]
                  }'`;
              } else {
                if (this.includeIdsInWhereClause.includes(entry[0]))
                  this.query += ` ${this.queryObjString}${entry[0]}->>'id' 
                 ${isLike ? 'ILIKE' : '='}  '${entry[1]}'`;
                else if (this.nestedFiltering.includes(entry[0])) {
                  const queryObjStringForEl =
                    this.nestedFilteringObjValue[
                      this.nestedFiltering.indexOf(entry[0])
                    ];
                  this.query += ` ${queryObjStringForEl}${entry[0]} ${
                    isLike ? 'ILIKE ' : '='
                  } '${entry[1]}'`;
                } else
                  this.query += ` ${this.queryObjString}${entry[0]} ${
                    isLike ? 'ILIKE ' : '='
                  } '${entry[1]}'`;
              }
              // this.args.push(entry[1]);
            }
          }
        },
      );
    }
    return this;
  }

  public sort(dontSorttAutomatically: boolean = false) {
    if (this.queryString.sort) {
      this.query += ` ORDER BY ${this.queryObjString && this.queryObjString}`;
      this.queryString.sort
        .split(',')
        .forEach((orderBy: string, index: number) => {
          if (index > 0) {
            this.query += ',';
          }
          this.query += ` ${orderBy.replace('-', '')}`;

          const isDescending = orderBy.includes('-');
          if (isDescending) {
            this.query += ' DESC';
          } else {
            this.query += ' ASC';
          }
        });
    } else {
      if (dontSorttAutomatically) return this;
      else {
        this.query += ` ORDER BY ${
          this.queryObjString && this.queryObjString
        }id DESC`;
      }
    }

    return this;
  }

  public paginate() {
    if (this.queryString.page && this.queryString.limit) {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;

      this.query += ` LIMIT ${limit} OFFSET ${skip} `;
    }
    return this;
  }
}

export default ApiFeatures;
