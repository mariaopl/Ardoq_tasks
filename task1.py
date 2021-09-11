def highestProduct(listOfIntegers):
    product = 1
    listOfIntegers.sort(reverse=True)
    for i in range(3):
        product = product * listOfIntegers[i]
    return product
