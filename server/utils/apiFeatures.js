class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    const queryStringObj = { ...this.queryString };
    const excludesFields = ["page", "sort", "limit", "fields"];
    excludesFields.forEach((field) => delete queryStringObj[field]);
    // Apply filtration using [gte, gt, lte, lt]
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  search() {
    // Si aucun mot-clé n'est fourni, retourner la requête telle quelle
    if (!this.queryString.keyword) {
      console.log("Aucun mot-clé fourni");
      return this;
    }

    // Construire la requête de recherche
    let query = {};

    query = {
      $or: [
        { nom: { $regex: this.queryString.keyword, $options: "i" } },
        { semestre: { $regex: this.queryString.keyword, $options: "i" } }
      ]
    };

    // Vérifier que mongooseQuery est bien défini
    if (!this.mongooseQuery || typeof this.mongooseQuery.find !== "function") {
      console.error(
        "Erreur: this.mongooseQuery n'est pas une instance de Query."
      );
      return this;
    }

    // Récupérer les filtres existants et supprimer le champ "keyword"
    const existingFilter = this.mongooseQuery.getFilter();
    delete existingFilter.keyword; // Supprimer le champ "keyword"

    // Fusionner les filtres existants (sans "keyword") avec la nouvelle requête
    const finalQuery = { ...existingFilter, ...query };

    // Appliquer la requête finale
    this.mongooseQuery = this.mongooseQuery.find(finalQuery);

    return this;
  }

  paginate(countDocuments) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 50;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    // Pagination result
    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(countDocuments / limit);

    // next page
    if (endIndex < countDocuments) {
      pagination.next = page + 1;
    }
    if (skip > 0) {
      pagination.prev = page - 1;
    }
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    this.paginationResult = pagination;
    return this;
  }
}

module.exports = ApiFeatures;
