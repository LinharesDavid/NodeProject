module.exports = app => {
    class User extends require('./.DBManager')(app) {
        constructor() {
            super('users');
        }

        populate(criteria) {
            return app.db.collection(this.collectionName).aggregate([
                {
                    $match: criteria
                },
                {
                    $lookup: {
                        from: 'cars',
                        localField: 'cars',
                        foreignField: '_id',
                        as: 'cars'
                    }
                }
            ], {});
        }

        verify(data) {
            return this.checkRequiredStringField(data.firstName) &&
                this.checkRequiredStringField(data.lastName) &&
                this.checkRequiredStringField(data.username) &&
                this.checkRequiredStringField(data.password);
        }
    }

    return new User();
};