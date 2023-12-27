class APIFeatures {
    constructor(query, queryString) {
        this._query = query;
        this._queryString = queryString;
    }

    paginate() {
        const page = this._queryString.page || 1;
        const limit = this._queryString.limit || 10;
        this._query.skip((page - 1) * limit).limit(limit);
        return this;
    }

    sort() {
        if (this._queryString.sort) {
            const sortFields = this._queryString.sort.split(',').join(' ');
            this._query.sort(sortFields);
        } else {
            this._query.sort('-createdAt');
        }
        return this;
    }

    filter() {
        const queryObj = { ...this._queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => {
            const symbolMap = { gt: '>', gte: '>=', lt: '<', lte: '<=' };
            return symbolMap[match];
        });

        const parsedQuery = JSON.parse(queryStr);
        this._query = this._query.find(parsedQuery);

        return this;
    }

    limitFields() {
        if (this._queryString.fields) {
            const fields = this._queryString.fields.split(',').join(' ');
            this._query = this._query.select(fields);
        } else {
            this._query = this._query.select('-__v');
        }
        return this;
    }
}

module.exports = APIFeatures