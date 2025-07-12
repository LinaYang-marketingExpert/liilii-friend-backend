
class BaseAssets {
    private db: any;

    constructor(_db: any) {
        this.db = _db;
    }

    async findOne (filter: any) {
        const result = await this.db.findOne(filter);
        return result;
    }

    async findAll (filter: {}) {
        const result = await this.db.find(filter);
        return result;
    }

    async create (data: any) {
        const newData = new this.db(data);
        await newData.save();
        return newData;
    }

    async update ({filter, data}: any) {
        console.log(filter, data);
        const result = await this.db.findOneAndUpdate(filter, { $set: data });
        return result;
    }

    async delete (filter: any) {
        const result = await this.db.delete(filter);
        return true;
    }

    async getLast ({filter, data}: any) {
        const result = await this.db.find(filter).sort(data);
        return result;
    }
}

export {
    BaseAssets
}