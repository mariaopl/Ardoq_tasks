def highestProduct(listOfIntegers):
    result = []
    product = 1
    for i in range(0,3):
        max1 = 0
        for j in range(len(listOfIntegers)):
            if listOfIntegers[j] > max1:
                max1 = listOfIntegers[j]
        listOfIntegers.remove(max1)
        result.append(max1)
    for k in range(len(result)):
        product = product * result[k]
    return product


print(highestProduct([20,70,4,7,10,65]))