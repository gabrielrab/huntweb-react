if (scholarships.isFulfilled) {
    let _results = scholarships.data;
    if (filters.city !== '') {
        _results = _results.filter(item => item.campus.city === filters.city)
    }

    if (filters.course !== '') {
        _results = _results.filter(item => item.course.name === filters.course)
    }

    _results = _results.filter(item => filters.kindOfCourse.includes(item.course.kind));
    _results = _results.filter(item => item.price_with_discount <= filters.maxPrice);

    setResults(orderResultsBy(_results));
} 