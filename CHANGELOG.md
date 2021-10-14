[13.10.2021] 1.8.13
* Добавлены запросы на получение полного набора сущностей
* Добавлены асинхронные запросы с суффиксом _Async
* Данные из запросов выдаются в виде мессаджей, а не моделей
* В типе данных Medication добавлены новые поля (см. [CHANGELOG](https://docs.med.me/ehr/latest/z90-versions/))
* Добавлен FieldFormatter
* Добавлен стенд по полному набору данных (не в публичном доступе)

[28.01.2020] 1.7.5
* Улучшено форматирование результатов приемов
* Вынесены настройки из репозитория
* Добавлены коды ошибок _Entity_NotFound
* Заменена ошибка GetPatientError на PatientNotFound
* Добавлены ValidationErrors в описания ответов

[19.12.2019] 1.5.6
* Move l10n constants in separate files for SimpleTextFormatter
* web_sample. Remove direct loading of medme amd-module; preloading 3dparts; update env
* Add declaration amd-module for tsc
* web_sample. Rename index requirement to MedMe
* Remove get patient error
* Remove flatbuffers deps
* web_sample. Extract private env variables from git repo
* web_sample. Add client and server info panels

