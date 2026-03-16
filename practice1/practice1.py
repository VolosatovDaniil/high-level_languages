# Рівень 1: 1. Створіть програму, яка виводить на екран від 1 до 10.
for num in range(1, 11):
    print(num)

# Рівень 2: 1. Напишіть програму, яка знаходить середнє значення з трьох чисел, введених користувачем.
nums = [
    float(input("Number 1: ")),
    float(input("Number 2: ")),
    float(input("Number 3: "))
]
print(round(sum(nums) / len(nums), 2))

# Рівень 3: 1. Реалізуйте програму, яка приймає на вхід рік народження користувача та виводить його вік.
from datetime import datetime

current = datetime.now().year
birth_year = int(input("Enter your birth year: "))

print(f"Ваш вік: {current - birth_year}")