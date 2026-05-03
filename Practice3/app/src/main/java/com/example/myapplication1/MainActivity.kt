package com.example.myapplication1

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import java.io.File

class MainActivity : AppCompatActivity() {

    var hiddenWord = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // ЗАВДАННЯ 1
        val editNum1 = findViewById<EditText>(R.id.editNum1)
        val editNum2 = findViewById<EditText>(R.id.editNum2)
        val btnMultiply = findViewById<Button>(R.id.btnMultiply)
        val txtResult1 = findViewById<TextView>(R.id.txtResult1)

        btnMultiply.setOnClickListener {
            val a = editNum1.text.toString().toIntOrNull() ?: 0
            val b = editNum2.text.toString().toIntOrNull() ?: 0
            val product = a * b
            txtResult1.text = "Результат: $product"
        }

        // ЗАВДАННЯ 2
        val editSecret = findViewById<EditText>(R.id.editSecretWord)
        val btnSave = findViewById<Button>(R.id.btnSaveWord)
        val editGuess = findViewById<EditText>(R.id.editGuessWord)
        val btnCheck = findViewById<Button>(R.id.btnCheckWord)
        val txtResult2 = findViewById<TextView>(R.id.txtResult2)

        btnSave.setOnClickListener {
            hiddenWord = editSecret.text.toString().lowercase()
            editSecret.text.clear()
            txtResult2.text = "Слово загадано"
        }

        btnCheck.setOnClickListener {
            val userGuess = editGuess.text.toString().lowercase()
            if (hiddenWord.isEmpty()) {
                txtResult2.text = "Спочатку загадайте слово!"
            } else if (userGuess == hiddenWord) {
                txtResult2.text = "Правильно! Це слово: $hiddenWord"
            } else {
                txtResult2.text = "Не вгадали"
            }
        }

        // ЗАВДАННЯ 3
        val btnCount = findViewById<Button>(R.id.btnCountWords)
        val txtResult3 = findViewById<TextView>(R.id.txtResult3)

        btnCount.setOnClickListener {
            val testFile = File(filesDir, "my_data.txt")
            testFile.writeText("Приклад")

            if (testFile.exists()) {
                val content = testFile.readText()
                val wordsCount = content.trim().split(Regex("\\s+")).size
                txtResult3.text = "У файлі знайдено $wordsCount слів"
            }
        }

        // ЗАВДАННЯ 4
        val btnDelete = findViewById<Button>(R.id.btnDeleteDupes)
        val txtResult4 = findViewById<TextView>(R.id.txtResult4)

        btnDelete.setOnClickListener {
            val folder = filesDir

            File(folder, "file1.txt").writeText("Дублікат")
            File(folder, "file2.txt").writeText("Дублікат")
            File(folder, "file3.txt").writeText("Текст")
            File(folder, "file4.txt").writeText("Дублікат")

            val files = folder.listFiles()
            val seenContents = mutableSetOf<String>()
            var countDeleted = 0

            files?.forEach { file ->
                if (file.isFile) {
                    val text = file.readText()
                    if (seenContents.contains(text)) {
                        file.delete()
                        countDeleted++
                    } else {
                        seenContents.add(text)
                    }
                }
            }
            txtResult4.text = "Видалено дублікатів: $countDeleted"
        }
    }
}