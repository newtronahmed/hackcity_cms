class ServiceFactory {
    constructor(model) {
        this.model = model
    }
    // List all categorys
    async getAll() {
        try {
            const results = await model.find({});
            // console.log(categories.length)
            return results;
        } catch (error) {
            throw error;
        }
    }
    // Create a new category
    async createNew(category) {

        try {
            const newobj = new model(category);
            const result = await newobj.save();
            return result;
        } catch (error) {
            throw error;
        }
    }
    async getOne(id) {
        try {
            const result = await model.findById(id)
            return result
        } catch (error) {
            throw error
        }
    }

    // Delete a category by ID
    async delete(id) {
        try {
            console.log(id)
            const deleted = await model.findByIdAndDelete(id);
            // if (!deletedcategory) {
            //   throw new Error("category not found")
            // }

            return deleted;
        } catch (error) {
            throw error;
        }
    }

    // Edit a category by ID
    async edit(id, updatedData) {
        try {
            const edited = await model.findByIdAndUpdate(id, updatedData, {
                new: true, // Return the modified document rather than the original
                runValidators: true, // Run model validation on update
            });

            if (!edited) {
                throw new Error('category not found');
            }

            return edited;
        } catch (error) {
            throw error;
        }
    }
}